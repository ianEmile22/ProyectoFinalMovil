import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Button, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../database/firebase';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

function AddAction() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        image: '',
        audio: ''
    });
    const [recording, setRecording] = useState();
    const image = require('../assets/images/warbg.jpg');

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSelectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setFormData({ ...formData, image: result.uri });
        }
    }

    const handleSave = async () => {
        if (formData.title.length === 0) {
            alert('Title is required');
            return;
        }
        try {
            await firebase.firestore().collection('actions').add(formData);
            alert('Action saved');
        }
        catch (error) {
            console.log(error);
        }
    }

    async function startRecording() {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setFormData({ ...formData, audio: uri });
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.container}>
                <View>

                    <TextInput
                        placeholder="Titulo"
                        onChangeText={(value) => handleChange('title', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Fecha"
                        onChangeText={(value) => handleChange('date', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Descripcion"
                        onChangeText={(value) => handleChange('description', value)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <TouchableOpacity
                        onPress={handleSelectImage}
                        style={styles.pickImage}
                    >
                        <Text style={{ color: "#fff" }}>Seleccionar imagen</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Button
                        title={recording ? 'Detener Grabacion' : 'Grabar Audio'}
                        onPress={recording ? stopRecording : startRecording}
                        style={{ alignSelf: 'end' }}
                    />
                    <Button title="Guardar" onPress={handleSave} />
                </View>
            </ImageBackground>
        </View>
    );
}

export default AddAction;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    pickImage: {
        height: 200,
        width: 200,
        // flex: 1,
        marginVertical: 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a5a4080',
        borderWidth: 1,
        borderColor: '#588157',
        color: '#fff',
    },
});