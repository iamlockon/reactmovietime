import React, { Component } from 'react';
import Movie from './Movie';
import tileData from '../tileData';
/**
 * 
 * Display all movies in a list.
 * Movies props: title, koremitai counts, length, poster, 
 * teaser embed url
 */
export default class Movies extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const movies = [];
        const teaser_uri = "https://www.youtube.com/embed/Gpr_ISfWFsk";
        tileData.forEach((ele, i) => {
            movies.push(<Movie key={i} title={ele.title} ikoremitai={ele.ikoremitai} koremitai={ele.koremitai} length={ele.length} poster_uri={ele.img} teaser_uri={teaser_uri}/>);
        });
        return (<div>{movies}</div>);
    }
}

