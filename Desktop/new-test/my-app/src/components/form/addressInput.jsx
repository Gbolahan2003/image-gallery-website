import React, { useRef, useState } from 'react'
import {
    useLoadScript,
    Autocomplete,
} from '@react-google-maps/api'
import { Controller } from 'react-hook-form';

const apiKey = 'AIzaSyBCYbBd9q9KeBrwfgBb0PYwLFOHwxSQ058';

const scriptOptions = {
    googleMapsApiKey: apiKey,
    libraries: ['places'],
}

const AddressInput = ({ placeholder = "Enter Address", setValue, name, control, setFormComplete }) => {

    const { isLoaded, loadError } = useLoadScript(scriptOptions)
    const [autocomplete, setAutocomplete] = useState(null)
    const inputEl = useRef(null)

    const onKeypress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            return false
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }


    const onLoad = (autocompleteObj) => {
        setAutocomplete(autocompleteObj)
    }


    const onPlaceChanged = async () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();

            if ('place_id' in place) {
                if (!place.geometry || !place.geometry.location) {
                    try {
                        const details = await getPlaceDetails(place.place_id);
                        const latitude = details.geometry.location.lat();
                        const longitude = details.geometry.location.lng();

                        setValue(name, details.formatted_address)
                        setValue("latitude", `${latitude}`)
                        setValue("longitude", `${longitude}`)
                        setFormComplete(true)

                    } catch (error) {
                        console.error('Error fetching place details:', error);
                    }
                } else {
                    const { lat, lng } = place.geometry.location;
                }
            }
        }
    };


    const getPlaceDetails = (placeId) => {
        return new Promise((resolve, reject) => {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));
            service.getDetails({ placeId }, (result, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(result);
                } else {
                    reject(new Error('Place details not found'));
                }
            });
        });
    };



    return (
        <div>
            {loadError && <div className="text-xs">Google Places script cant be loaded, please reload the page</div>}

            {isLoaded && (
                <Autocomplete onLoad={onLoad} fields={['place_id']} onPlaceChanged={onPlaceChanged}>
                    <div className="relative w-full">
                        <Controller
                            name={name}
                            control={control}
                            // defaultValue={defaultValue}
                            render={({ field }) => (
                                <input
                                    ref={(e) => {
                                        field.ref(e);
                                        inputEl.current = e;
                                    }}
                                    {...field}
                                    type="text"
                                    placeholder={placeholder}
                                    value={field.value}
                                    className={`input appearance-none focus:outline-none focus:ring-0 peer`}
                                    onKeyPress={onKeypress}
                                />
                            )}
                        />
                    </div>
                </Autocomplete>
            )}
        </div>

    )
};

export default AddressInput;