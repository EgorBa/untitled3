import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ModalCard, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';
import bridge from "@vkontakte/vk-bridge";
import MyModal from "../MyModal/MyModal";

const stickers = [{
    id: 1,
    name: "Коты",
    src: "https://vk.com/sticker/200000/256b.png",
    price: 5,
    min_id: 200000,
    max_id: 200024
},
    {
        id: 2,
        name: "Супер коты",
        src: "https://vk.com/sticker/200001/256b.png",
        price: 6,
        min_id: 200025,
        max_id: 200048
    }]

const Stickers = props => {
    const [showSticker, setShowSticker] = useState(false)
    const [modal, setModal] = useState(false)
    const [data, setData] = useState({})
    const [id, setId] = useState(0)

    const showModal = (sticker) => {
        setModal(true)
        setData(sticker)
        setId(getRandomInt(sticker.min_id, sticker.max_id))
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

    function getRandomInt(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    return (<Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={showSticker ? handleClose : props.go} data-to="home"/>}
            >
                Магазин кастомных Персиков
            </PanelHeader>
            {showSticker ?
                <div style={{
                    justifyContent:"center",
                    display: "flex", padding: "5px", alignContent: "center", maxWidth: "100%",
                }}>
                    <div style={{
                        justifyContent:"center",
                        display: "flex", padding: "5px", alignContent: "center", maxWidth: "300px",
                        maxHeight: "100%", flexDirection: "column",border: "5px",
                        borderStyle: "solid",
                        borderColor: "#5376A2",
                        borderRadius: "10px",
                        margin:"10px"
                    }}>
                        <h1 style={{
                            width: "100%",
                            textAlign: "center",
                            alignContent: "center"
                        }}>
                            Ура! Вам выпал стикер с номером {id % 200000}
                        </h1>
                        <img style={{
                            width: "100%",
                            height: "100%",
                        }}  src={"https://vk.com/sticker/" + id + "/256b.png"}/>
                        <Button type="button" onClick={handleClose} stretched size="l" mode="secondary"
                                style={{marginTop: "4px"}}>
                            Спасибо! Вернуться в магазин.
                        </Button>
                    </div>
                </div>

                :
                <div style={{display: "grid", padding: "5px"}}>
                    {stickers.map(sticker =>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "300px",
                            height: "400px",
                            margin: "10px",
                            padding: "5px",
                            paddingBottom: "15px",
                            border: "5px",
                            borderStyle: "solid",
                            borderColor: "#5376A2",
                            borderRadius: "10px"
                        }} key={sticker.id}>
                            <h2 style={{
                                width: "100%",
                                textAlign: "center",
                                alignContent: "center"
                            }}>
                                {sticker.name}
                            </h2>
                            <img style={{
                                width: "300px",
                                height: "400px",
                            }} src={sticker.src}/>
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
                <div style={{display:"flex", width:"100%",alignContent:"space-between",justifyContent:"center"}}>
                    <Button onClick={submitTransaction} stretched size="l"
                            style={{marginLeft: "30px", marginRight: "30px", maxWidth:"200px"}}>
                        Да
                    </Button>
                    <Button onClick={cancelTransaction} stretched size="l"
                            style={{marginLeft: "30px", marginRight: "30px", maxWidth:"200px"}}>
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
