import React, { useState, useEffect } from 'react';
import Image from './Image'

export default function Group(props) {
    const _renderImages = () => {
      return Object.entries(props.data.imageUrls).map(x => {
          let [imageIndex,item] = x
        return <Image 
        imageIndex={imageIndex} 
        groupIndex={props.groupIndex} 
        imageUrl={item} 
        handleOnBlur={props.handleOnBlur}
        ></Image>
      })
    }
    return (
      <div className="groupContainer">
      {_renderImages()}
      </div>
    )
  }
  