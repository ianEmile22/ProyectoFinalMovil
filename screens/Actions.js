import React from 'react';
import { View, Text, Button, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import firebase from '../database/firebase';

function Actions({ navigation }) {
    const [actions, setActions] = useState([]);
    const actionsRef = firebase.firestore().collection('actions');
    const image = require('../assets/images/warbg.jpg');

    const handleClick = (action) => {
        console.log(action);
        navigation.navigate('ActionDetails', { action: action });
    }

    useEffect(() => {
        actionsRef.onSnapshot((snapshot) => {
            const newActions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setActions(newActions);
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate('AddAction')} style={styles.AddButton}>
                    <Text style={styles.AddButtonText}>+</Text>
                </TouchableOpacity>
                <View>
                    {actions.map((action) => (
                        <TouchableOpacity
                            key={action.id}
                            onPress={() => handleClick(action)}
                            style={styles.actionItem}
                        >
                            <Text style={styles.actionItemText}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ImageBackground>
        </View>
    );
}

export default Actions;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    AddButton: {
        backgroundColor: '#3a5a40',
        // borderRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        padding: 10,
        // margin: 10,
        marginVertical: 10,
        width: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddButtonText: {
        color: '#fff',
        fontSize: 30,
    },
    actionItem: {
        backgroundColor: '#588157',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionItemText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    }
});
