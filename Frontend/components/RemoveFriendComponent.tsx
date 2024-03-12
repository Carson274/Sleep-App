import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import RemoveFriendIcon from '../assets/icons/RemoveIcon.svg';

const RemoveFriendComponent = ({ setRefresh, username, friendUsername }) => {
  const [removed, setRemoved] = useState(false);

  // check to see if the user is already friends with the user
  const removeFriendRequest = async () => {
    const response = await fetch(`http://localhost:8080/removeFriend?username=${username}&friendUsername=${friendUsername}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
    return response;
  }

  const removeFriend = async () => {
    console.log(friendUsername)
    const response = await removeFriendRequest();
    if(response.result === "success") {
      setRemoved(true);
      setRefresh(true);
    }
  }

  return (
    <>
      <TouchableOpacity onPress={removeFriend}>
        <RemoveFriendIcon />
      </TouchableOpacity>
    </>
  );
}

export default RemoveFriendComponent;