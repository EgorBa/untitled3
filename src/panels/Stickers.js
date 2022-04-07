import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ModalCard, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import MyModal from "../MyModal/MyModal";

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
    const [showSticker, setShowSticker] = useState(false)
    const [modal, setModal] = useState(false)
    const [data, setData] = useState({})

    const showModal = (sticker) => {
        setModal(true)
        setData(sticker)
    }

    const submitTransaction = () => {
        setModal(false)
        setShowSticker(true)
    }

    const cancelTransaction = () => {
        setModal(false)
    }

    const handleClose = () => {
        setShowSticker(false)
    }

    return (<Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Stickers
            </PanelHeader>
            {showSticker ?
                <div style={{
                    display: "flex", padding: "5px", alignContent: "center", maxWidth: "600px",
                    maxHeight: "600px", flexDirection: "column"
                }}>
                    <h1>
                        Ура! Вам выпал стикер
                    </h1>
                    <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                    <Button type="button" onClick={handleClose} stretched size="l" mode="secondary" style={{marginTop: "4px"}}>
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
                            <Button style={{marginTop: "4px"}} onClick={_ => showModal(sticker)} stretched size="l">
                                Купи меня за {sticker.price} голосов
                            </Button>
                        </div>
                    )}
                </div>
            }
            <MyModal visible={modal} setVisible={setModal}>
                <h2>
                    Вы уверены что хотите купить стикер из набора {data.name} за {data.price} голосов?
                </h2>
                <div style={{display:"flex"}}>
                    <Button onClick={submitTransaction} stretched size="l"
                            style={{marginLeft: "30px", marginRight: "30px"}}>
                        Да
                    </Button>
                    <Button onClick={cancelTransaction} stretched size="l"
                            style={{marginLeft: "30px", marginRight: "30px"}}>
                        Нет
                    </Button>
                </div>
            </MyModal>
        </Panel>
    );
}

Stickers.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Stickers;
