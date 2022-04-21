import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import firebase from '../database/firebase';
import { Audio } from 'expo-av';

function ActionDetails({ route }) {
    const { action } = route.params;
    const imagePath = action.image;
    const [sound, setSound] = useState();

    const handleDelete = async () => {
        try {
            await firebase.firestore().collection('actions').doc(action.id).delete();
            alert('Action deleted');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            action.audio,
        );
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
            {action.image &&
                <View>
                    <Image
                        source={{ uri: imagePath }}
                        style={{ width: "100%", height: 200 }}
                    />
                </View>
            }
            <View style={{ flex: 1, justifyContent: "space-around" }}>
                <Text>Titulo: {action?.title}</Text>
                <Text>Descripcion: {action?.description}</Text>
                <Text>Fecha: {action?.date}</Text>
                {action.audio && <Button title="Play Sound" onPress={playSound} />}
            </View>
            <View>
                <Button
                    title="Delete"
                    onPress={handleDelete}
                />
            </View>
        </View>
    );
}

export default ActionDetails;