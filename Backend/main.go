package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	"golang.org/x/crypto/bcrypt"
)

// User represents a user in the system
type User struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"` // use omitempty to ignore the field if it is empty
	Name       string             `bson:"name"`
	Username   string             `bson:"username"`
	Password   string             `bson:"password"`
	NumFriends int                `bson:"numFriends"`
	Friends    []string           `bson:"friends"` // list of friend usernames
	SleepStats []SleepStatistic   `bson:"sleepStats"`
}

// SleepStatistic represents a user's sleep data for a single night
type SleepStatistic struct {
	Date       primitive.DateTime `bson:"date"`       // use the MongoDB datetime format for ease of querying
	HoursSlept float64            `bson:"hoursSlept"` // number of hours slept, allows for partial hours
}

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash checks if a password is the hash of the given password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func main() {
	// load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// get the environment variable for the connection string
	connectString := os.Getenv("MONGODB_CONNECT_STRING")

	// if the environment variable is not set, then exit the program
	if connectString == "" {
		log.Fatal("MONGODB_CONNECT_STRING environment variable not set")
	}

	// create a new client (user in our case)
	client, err := mongo.NewClient(options.Client().ApplyURI(connectString))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Successfully connected and pinged MongoDB!")

	databases, err := client.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	// get the users collection
	coll := client.Database("users_db").Collection("users")
	docs := []interface{}{
		User{
			Name:       "Carson",
			Username:   "carpet",
			NumFriends: 3,
			Friends:    []string{"jinnypooh", "sebas", "rist"},
			SleepStats: []SleepStatistic{
				{
					Date:       primitive.NewDateTimeFromTime(time.Now()),
					HoursSlept: 8.5,
				},
			},
		},
		User{
			Name:       "Sebastian",
			Username:   "sebas",
			NumFriends: 2,
			Friends:    []string{"carpet", "jinnypooh"},
			SleepStats: []SleepStatistic{
				{
					Date:       primitive.NewDateTimeFromTime(time.Now()),
					HoursSlept: 7.5,
				},
			},
		},
		User{
			Name:       "Jinny",
			Username:   "jinnypooh",
			NumFriends: 2,
			Friends:    []string{"carpet", "sebas"},
			SleepStats: []SleepStatistic{
				{
					Date:       primitive.NewDateTimeFromTime(time.Now()),
					HoursSlept: 6.5,
				},
			},
		},
	}

	// insert the documents into the collection
	result, err := coll.InsertMany(context.TODO(), docs)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Inserted %d documents into collection\n", len(result.InsertedIDs))
}
