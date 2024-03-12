import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AddFriendIcon from '../assets/icons/AddFriendIcon.svg';
import FriendAddedIcon from '../assets/icons/FriendAddedIcon.svg';

const AddFriendComponent = ({ username, friendUsername }) => {
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  // check to see if the user is already friends with the user
  const checkIfFriends = async () => {
    const response = await fetch(`http://localhost:8080/checkIfFriends?username=${username}&friendUsername=${friendUsername}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
    return response;
  }

  const checkIfAdded = async () => {
    const response = await checkIfFriends();
    if (response.result === 1) {
      setAlreadyFriends(true);
    }
  }

  const addFriendRequest = async () => {
    const response = await fetch(`http://localhost:8080/addFriend?username=${username}&friendUsername=${friendUsername}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
    return response;
  }

  const addFriend = async () => {
    console.log(friendUsername)
    const response = await addFriendRequest();
    if(response.result === "success") {
      setAlreadyFriends(true);
    }
  }

  return (
    <>
      {alreadyFriends ? (
        <FriendAddedIcon />
      ) : (
        <TouchableOpacity onPress={addFriend}>
          <AddFriendIcon />
        </TouchableOpacity>
      )}
    </>
  );
}

export default AddFriendComponent;