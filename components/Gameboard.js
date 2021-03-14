import React from 'react'
import { Text, View, Pressable } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import styles from '../style/style'
import style from '../style/style';

let board = [];
let position = [];
const NBR_OF_ROWS = 5;
const NBR_OF_COLS = 5;
const START = 'plus'
const CROSS = 'cross'
const CIRCLE = 'circle'

export default class Gameboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCross: true,
            winner: '',
            time: 30,
            hits: 0,
            bombs: 15,
            ships: 3,
            status: 'Game is not on',
            running: false,
            button: 'Start Game',
            ended: false
        }
        this.initializeBoard();

    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    initializeBoard() {
        for (let i = 0; i < NBR_OF_ROWS * NBR_OF_COLS; i++) {
            board[i] = START;
        }
        for (let i = 0; i <= 2;) {
            let randomNumber = this.getRandomInt(24);
            if (position.indexOf(randomNumber) === -1) {
                position.push(randomNumber); i++;
            }
        }
    }


    timerStart = () => {
        this.interval = setInterval(this.countdown, 1000);
    }

    countdown = () => {
        this.checkWinner();
        if (this.state.time > 0) {
            this.setState({
                time: this.state.time - 1,
            });
        }
    }

    timerStop = () => {
        clearInterval(this.interval);
    }

    startGame() {
        if (this.state.running === false) {
            this.setState({
                running: true,
                status: 'Game is on',
                button: 'New Game',
            })
            this.timerStart();

        }
        else {
            this.timerStop();
            this.resetGame();
        }
    }

    checkWinner() {
        if (this.state.time === 0) {
            this.timerStop();
            this.setState({
                status: 'Time ended',
                ended: true,
            })
        }
        if (this.state.hits === 3) {
            this.timerStop();
            this.setState({
                status: 'all ships sinked',
                ended: true,
            });
        }
        if (this.state.bombs === 0 && this.state.ships > 0) {
            this.timerStop();
            this.setState({
                status: 'out of bombs',
                ended: true,
            });
        }
    }


    drawItem(number) {
        if (this.state.running === false || this.state.ended === true) {
            this.setState({ status: 'Press start button' })
        }
        else if (board[number] === START) {

            if (position.indexOf(number) === -1) {
                board[number] = CROSS;
                this.state.bombs--;
            } else {
                this.state.ships--;
                this.state.hits++;
                this.state.bombs--;
                board[number] = CIRCLE;
            }
            this.checkWinner();
            this.setState({});
        }
    }

    choosItemColor(number) {
        if (board[number] === CROSS) {
            return "#FF3031";
        }
        else if (board[number] === CIRCLE) {
            return "#45CE30";
        }
        else {
            return "#74B9FF";
        }
    }

    resetGame() {
        this.setState({
            time: 30,
            hits: 0,
            bombs: 15,
            ships: 3,
            status: 'Game is not on',
            running: false,
            button: 'Start Game',
            ended: false,
        });
        this.initializeBoard();
    }


    render() {

        const firstRow = [];
        const secondRow = [];
        const thirdRow = [];
        const fourthRow = [];
        const fifthRow = [];

        for (let i = 0; i < NBR_OF_ROWS; i++) {
            firstRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.choosItemColor(i)} />
                </Pressable>
            )
        }

        for (let i = NBR_OF_ROWS; i < NBR_OF_ROWS * 2; i++) {
            secondRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.choosItemColor(i)} />
                </Pressable>
            )
        }

        for (let i = NBR_OF_ROWS * 2; i < NBR_OF_ROWS * 3; i++) {
            thirdRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.choosItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS * 3; i < NBR_OF_ROWS * 4; i++) {
            fourthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.choosItemColor(i)} />
                </Pressable>
            )
        }
        for (let i = NBR_OF_ROWS * 4; i < NBR_OF_ROWS * 5; i++) {
            fifthRow.push(
                <Pressable key={i} style={styles.row} onPress={() => this.drawItem(i)}>
                    <Entypo key={i} name={board[i]} size={32} color={this.choosItemColor(i)} />
                </Pressable>
            )
        }



        return (
            <View style={style.gameboard}>
                <View style={styles.flex}>{firstRow}</View>
                <View style={styles.flex}>{secondRow}</View>
                <View style={styles.flex}>{thirdRow}</View>
                <View style={styles.flex}>{fourthRow}</View>
                <View style={styles.flex}>{fifthRow}</View>
                <Text style={styles.gameinfo}>Hits {this.state.hits}</Text>
                <Text style={styles.gameinfo}>Bombs {this.state.bombs}</Text>
                <Text style={styles.gameinfo}>Ships {this.state.ships}</Text>
                <Text style={styles.gameinfo}>Time {this.state.time}</Text>
                <Text style={styles.gameinfo}>Status: {this.state.status}</Text>
                <Pressable style={styles.button} onPress={() => this.startGame()} >
                    <Text style={styles.buttonText}>{this.state.button}</Text>
                </Pressable>
            </View>

        )

    }

}