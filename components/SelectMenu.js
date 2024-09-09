import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";

const items = [
	{ name: "Affectionate", id: 36 },
	{ name: "Angry", id: 3 },
	{ name: "Anxious", id: 7 },
	{ name: "Apathetic", id: 43 },
	{ name: "Ashamed", id: 32 },
	{ name: "Bewildered", id: 37 },
	{ name: "Bored", id: 13 },
	{ name: "Calm", id: 19 },
	{ name: "Cheerful", id: 35 },
	{ name: "Confident", id: 10 },
	{ name: "Confused", id: 51 },
	{ name: "Content", id: 8 },
	{ name: "Curious", id: 21 },
	{ name: "Defeated", id: 46 },
	{ name: "Determined", id: 53 },
	{ name: "Detached", id: 52 },
	{ name: "Disappointed", id: 22 },
	{ name: "Disgusted", id: 55 },
	{ name: "Eager", id: 38 },
	{ name: "Elated", id: 50 },
	{ name: "Embarrassed", id: 26 },
	{ name: "Empathetic", id: 45 },
	{ name: "Envious", id: 48 },
	{ name: "Excited", id: 6 },
	{ name: "Fearful", id: 54 },
	{ name: "Frustrated", id: 9 },
	{ name: "Furious", id: 47 },
	{ name: "Grateful", id: 25 },
	{ name: "Guilty", id: 17 },
	{ name: "Happy", id: 1 },
	{ name: "Helpless", id: 39 },
	{ name: "Hopeful", id: 14 },
	{ name: "Impatient", id: 28 },
	{ name: "Indifferent", id: 41 },
	{ name: "Insecure", id: 30 },
	{ name: "Inspired", id: 12 },
	{ name: "Jealous", id: 24 },
	{ name: "Lonely", id: 23 },
	{ name: "Melancholy", id: 4 },
	{ name: "Motivated", id: 31 },
	{ name: "Nervous", id: 11 },
	{ name: "Optimistic", id: 27 },
	{ name: "Overwhelmed", id: 29 },
	{ name: "Peaceful", id: 34 },
	{ name: "Proud", id: 16 },
	{ name: "Regretful", id: 33 },
	{ name: "Relieved", id: 15 },
	{ name: "Sad", id: 2 },
	{ name: "Shocked", id: 42 },
	{ name: "Stressed", id: 18 },
	{ name: "Surprised", id: 20 },
	{ name: "Suspicious", id: 40 },
	{ name: "Sympathetic", id: 49 },
	{ name: "Tired", id: 5 },
	{ name: "Worried", id: 44 },
];


export default function SelectMenu({ selectedItems, onSelectedItemsChange }) {
  return (
    <View style={styles.container}>
      <SectionedMultiSelect
        items={items}
        IconRenderer={Icon}
        uniqueKey="id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Mood"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});











