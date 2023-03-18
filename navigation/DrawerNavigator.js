import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";

const Drawer = createDrawerNavigator();

componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            drawerContentOptions={{
                activeTintColor: "#e91e63" ,
                inactiveTintColor: this.state.light_theme ? "black" : "white" ,
                itemStyle: {marginVertical: 5}
            }}
            drawerContent={props => <CustomSidebarMenu {...props} />}

            <Drawer.Screen name="Home" component={StackNavigator} options={{unmountOnBlur: true}}/>
            <Drawer.Screen name="Profile" component={Profile} options={{unmountOnBlur: true}}/>
            <Drawer.Screen name="Logout" component={Logout} options={{unmountOnBlur: true}}/>
        </Drawer.Navigator>
    );
};

async addPost() {
    if (
        this.state.caption
    ) {
        let postData ={
            preview_image: this.state.previewIage, 
            caption: this.state.caption,
            author: firebase.auth().currentuser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            profile_image: this.state.profile_image,
            likes: 0,
        };

        await firebase
            .dataBase()
            .ref(
                "/posts/" + 
                Math.random()
                    .toString(36)
                    .slice(2)

            )
            .set(postData)
            .then(function (snapshot) { });
        this.props.setUpdateToTrue();
        this.props.navigation.navigate("Feed");
    } else {
        Alert.alert(
            "Error",
            "All fields are required!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            {cancelable: false}
        )
    }
}

export default DrawerNavigator;