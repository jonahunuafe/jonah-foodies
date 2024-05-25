'use client';

import { useRef, useState } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";


export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();

    function handlePicker() {
        imageInputRef.current.click();
    }

    function handleImageChange(event) {
        const file = event.target.files[0]       /* All the files that are picked, but we need only the first file i.e [0] */
        
        if(!file) {
            setPickedImage(null)   /* if the user doesn't pick a file */
            return;
        }

        const fileReader = new FileReader();  /* To show the file that has been chosen as a preview it needs to be converted to DataURL using the FileReader Object */

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image 
                            src={pickedImage} 
                            alt='The image selected by the user' 
                            fill 
                        />
                    )}
                </div>
                <input 
                    className={classes.input} 
                    type='file' 
                    id={name} 
                    accept='image/png, image/jpeg' 
                    name={name} 
                    ref={imageInputRef}
                    onChange={handleImageChange}
                />
                <button className={classes.button} type='button' onClick={handlePicker}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}