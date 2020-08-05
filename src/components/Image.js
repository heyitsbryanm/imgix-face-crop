import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Image(props) {
    // passed down to the Image component
    const [urlInput, setUrlInput] = useState(props.imageUrl);
    const [transformedUrl, setTransformedUrl] = useState(props.imageUrl);

    const handleOnChange = (e) => {
        setUrlInput(e.target.value);
    };

    let _renderImage = () => {
        return `${props.imageUrl.split('?')[0]}?w=467&h=700&fit=crop`;
    }
    useEffect(() => {
        let requestUrl = props.imageUrl.split('?')[0] + '?fm=json&faces=1&w=467&h=700';
        axios.get(requestUrl).then((result) => {
            result = result.data;
            if (result.Faces) {
                let face = result.Faces[0];

                let [baseUrl, params] = props.imageUrl.split('?');

                // get any existing params & parse the width
                let [originalWidth, originalHeight, faceBoundsX, faceBoundsY, faceBoundsWidth, faceBoundsHeight] = [result.PixelWidth, result.PixelHeight, face.bounds.x, face.bounds.y, face.bounds.width, face.bounds.height];
                let [width, height] = [undefined, undefined];
                if (params) {
                    params = params.split('&');

                    // get the size params of the image
                    if (params.includes)
                        params = params.filter(x => {
                            let [key, value] = x.split('=');
                            // get the rendered width and height of the image first
                            if (key === ('w' || 'width')) {
                                width = parseInt(value);
                            } if (key === ('h' || 'height')) {
                                height = parseInt(value)
                            }
                        }).join('&')
                }

                // if missing a width or height, calculate it from the original image
                if (typeof (width) === 'undefined' && typeof (height === 'undefined')) {
                    width = originalWidth;
                    height = originalHeight;
                } else {
                    if (typeof (width) === 'undefined') {
                        width = (height * originalWidth) / originalHeight
                    } else if (typeof (height) === 'undefined') {
                        height = (width * originalHeight) / originalWidth
                    }
                }
                let fpx = (faceBoundsX + faceBoundsWidth / 2) / width;
                let fpy = 1; // always focus on the bottom of the image
                let fpz = faceBoundsY / height * 4 + 1;

                setTransformedUrl(`${props.imageUrl.split('?')[0]}?fp-z=${fpz}&fp-y=${fpy}&fp-x=${fpx}&fit=crop&crop=focalpoint&w=467&h=700`)

            } else {
                setTransformedUrl(`${props.imageUrl}`)
            }
        })


    }, [props.imageUrl]);

    return (
        <div className="imageContainer">
            <div className="original">
                <img src={_renderImage()}></img>
                <p>Original image</p>
            </div>
            <div className="transformed">
                <img src={transformedUrl}></img>
                <p>Transformed</p>
            </div>
            <input type="text" className="urlInput" id="url_to_load" value={urlInput}
                onBlur={(e) => props.handleOnBlur(e, props.groupIndex, props.imageIndex)}
                onChange={(e) => handleOnChange(e)}></input>
        </div>
    )
}
