import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {Button, ModalCard, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui';

const stickers = [{
    id: 1,
    src: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    price: 50
},
    {
        id: 2,
        src: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
        price: 60
    }]

const Stickers = props => {
    const [showModal, setShowModal] = useState(false)

    const show = () => {
      setShowModal(true)
        console.log("lolkek")
    }

    return (<Panel id={props.id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={props.go} data-to="home"/>}
            >
                Stickers
            </PanelHeader>
            {/*<ModalCard visible={showModal}/>*/}
            <div style={{display: "flex", padding: "5px"}}>
                {stickers.map(sticker =>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "300px",
                        maxHeight: "500px",
                        margin: "10px"
                    }} key={sticker.id}>
                        <img src={sticker.src}/>
                        <Button style={{marginTop: "4px"}} onClick={show} stretched size="l" >
                            Купи меня за {sticker.price} голосов
                        </Button>
                    </div>
                )}
            </div>
        </Panel>
    );
}

Stickers.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Stickers;
