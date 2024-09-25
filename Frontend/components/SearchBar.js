import React from "react";
import { Searchbar } from "react-native-paper";

const SearchBar = ({ onChangeText, value }) => {
	return <Searchbar placeholder="Search..." onChangeText={onChangeText} value={value} />;
};

export default SearchBar;
