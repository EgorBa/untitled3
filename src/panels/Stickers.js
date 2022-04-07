import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ModalCard, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";

const stickers = [{
    id: 1,
    name: "Коты",
    src: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    price: 50
},
    {
        id: 2,
        name: "Супер коты",
        src: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        price: 60
    }]

const Stickers = props => {
    const [showModal, setShowModal] = useState(false)
    // bridge.subscribe((e) => {
    //     if(e.type === "VKWebAppShowOrderBoxResult") {
    //         console.log(e.data.status);
    //     }});


    const show = () => {
        bridge.send("VKWebAppShowOrderBox", {
            type: "item",
            item: "item_id_123"
        })
            .then(data => console.log(data.status))
            .catch(error => console.log(error));
    }

    const showHideClassName = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (<Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Stickers
            </PanelHeader>
            {showModal ?
                <div style={{
                    display: "flex", padding: "5px", alignContent: "center", maxWidth: "600px",
                    maxHeight: "600px", flexDirection: "column"
                }}>
                    <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                    <Button type="button" onClick={handleClose} stretched size="l" mode="secondary">
                        Спасибо!
                    </Button>
                </div>
                :
                <div style={{display: "flex", padding: "5px"}}>
                    {stickers.map(sticker =>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            maxWidth: "300px",
                            maxHeight: "500px",
                            margin: "10px"
                        }} key={sticker.id}>
                            <h2>
                                Коллекция : {sticker.name}
                            </h2>
                            <img src={sticker.src}/>
                            <Button style={{marginTop: "4px"}} onClick={showHideClassName} stretched size="l">
                                Купи меня за {sticker.price} голосов
                            </Button>
                        </div>
                    )}
                </div>
            }


        </Panel>
    );
}

Stickers.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Stickers;
