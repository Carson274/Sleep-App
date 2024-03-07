package main

import (
	"net/http"
	"fmt"
	"encoding/json"

	"context"
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

var client *mongo.Client

// User represents a user in the system
type User struct {
	Id         primitive.ObjectID `bson:"_id,omitempty"` // use omitempty to ignore the field if it is empty
	Name       string             `bson:"name"`
	Username   string             `bson:"username"`
	Password   string             `bson:"password"`
	NumFriends int                `bson:"numFriends"`
	Friends    []string           `bson:"friends"` // list of friend usernames
	FriendRequests []string       `bson:"friendRequests"` // list of friend requests
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

func connectToDB() {
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
	client, err = mongo.NewClient(options.Client().ApplyURI(connectString))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Successfully connected and pinged MongoDB!")
}

// CheckPasswordHash checks if a password is the hash of the given password
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func UsernameAvailable(w http.ResponseWriter, r *http.Request) {
	// Get the username from the request
	username := r.URL.Query().Get("username")

	w.Header().Set("Content-Type", "application/json")
	response := map[string]int{"result": 0} //Default response is no username available, updates to 1 if username is available

	//Check is username is already in MongoDB
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	collection := client.Database("users_db").Collection("users")
	filter := bson.M{"username": username}
	var result User

	err := collection.FindOne(ctx, filter).Decode(&result)

	if err == mongo.ErrNoDocuments {
		fmt.Println(err)
        response["result"] = 1
	}
		
	// Send the response
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {

	connectToDB()

	if client == nil {
		fmt.Println("Client is nil")
		return
	}

	http.HandleFunc("/validUsername", UsernameAvailable)

    // Start the HTTP server on port 8080 and log any errors
    fmt.Println("Server is running on port 8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("Error starting server: ", err)
    }

}
