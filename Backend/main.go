package main

import (
	"net/http"
	"fmt"
	"encoding/json"

	// "context"
	// "log"
	// "os"
	// "time"
	// "github.com/joho/godotenv"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	// "go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
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
	

	if username == "" {
		http.Error(w, "No username provided", http.StatusBadRequest)
		return
	} else if username == "test1" { //TODO: Implement logic to check if username is available here
        response["result"] = 1
	} 
		
	// Send the response
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {

	http.HandleFunc("/validUsername", UsernameAvailable)

    // Start the HTTP server on port 8080 and log any errors
    fmt.Println("Server is running on port 8080")
    err := http.ListenAndServe(":8080", nil)
    if err != nil {
        fmt.Println("Error starting server: ", err)
    }

}
