import React from 'react';
import CenteredGrid from './Grid.js';
import axios from 'axios';
import '../style.css';

// const deployedIP = 'localhost:4000';
const deployedIP = '3.14.127.248:4000';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      reviews: [[], [], [], [], []],
      ratingAverage: 3,
      ratings: [1, 2, 3, 4, 5],
      pros: [2, 3, 5, 4, 1],
      cons: [-3, -2, 0, -1, -4]
    }
  }

  componentDidMount() {
    window.addEventListener('productId', (e) => {
      this.setState({
        productId: e.detail
      }, () => {
        const data = {
          productId: this.state.productId
        }
        // console.log('window e.detail productId, data:', data)
        axios.get(`http://${deployedIP}/api/getreviews`, {params: data})
          .then(res => {
            // console.log('axios getreviews success, res.data', res.data)
            const reviews = res.data;
            const newRatings = [0, 0, 0, 0, 0];
            const newPros = [0, 0, 0, 0, 0];
            const newCons = [0, 0, 0, 0, 0];
            const score = [];
            for (let review of reviews) {
              score.push(review.score);
              if (review.score === 1) {
                newRatings[0]++
              } else if (review.score === 2) {
                newRatings[1]++
              } else if (review.score === 3) {
                newRatings[2]++
              } else if (review.score === 4) {
                newRatings[3]++
              } else if (review.score === 5) {
                newRatings[4]++
              }
            }
            for (let review of reviews) {
              if (review.proscons.value === true) {
                newPros[0]++
              } else {
                newCons[0]--
              }
              if (review.proscons.reliability === true) {
                newPros[1]++
              } else {
                newCons[1]--
              }
              if (review.proscons.performance === true) {
                newPros[2]++
              } else {
                newCons[2]--
              }
              if (review.proscons.looks === true) {
                newPros[3]++
              } else {
                newCons[3]--
              }
              if (review.proscons.durability === true) {
                newPros[4]++
              } else {
                newCons[4]--
              }
            }
            const newRatingAverage = (score.reduce(((acc, curr) => acc + curr), 0) / reviews.length);
            console.log('newRatingAverage:', newRatingAverage, 'newRatings:', newRatings)
            console.log('newPros:', newPros, 'newCons:', newCons)
            this.setState({
              reviews: reviews,
              ratingAverage: newRatingAverage,
              ratings: newRatings,
              pros: newPros,
              cons: newCons
            })
          })
          .catch(err => {
            console.log('axios getreviews error:', err)
          })
      })
    })

    const data = {
      productId: this.state.productId
    }
    console.log('in App, data:', data)
    axios.get(`http://${deployedIP}/api/getreviews`, {params: data})
      .then(res => {
        console.log('axios getreviews success, res.data', res.data)
        const reviews = res.data;
        const newRatings = [0, 0, 0, 0, 0];
        const newPros = [0, 0, 0, 0, 0];
        const newCons = [0, 0, 0, 0, 0];
        const score = [];
        for (let review of reviews) {
          score.push(review.score)
          if (review.score === 1) {
            newRatings[0]++
          } else if (review.score === 2) {
            newRatings[1]++
          } else if (review.score === 3) {
            newRatings[2]++
          } else if (review.score === 4) {
            newRatings[3]++
          } else if (review.score === 5) {
            newRatings[4]++
          }
        }
        for (let review of reviews) {
          if (review.proscons.value === true) {
            newPros[0]++
          } else {
            newCons[0]--
          }
          if (review.proscons.reliability === true) {
            newPros[1]++
          } else {
            newCons[1]--
          }
          if (review.proscons.performance === true) {
            newPros[2]++
          } else {
            newCons[2]--
          }
          if (review.proscons.looks === true) {
            newPros[3]++
          } else {
            newCons[3]--
          }
          if (review.proscons.durability === true) {
            newPros[4]++
          } else {
            newCons[4]--
          }
        }
        const newRatingAverage = (score.reduce(((acc, curr) => acc + curr), 0) / reviews.length);
        console.log('newRatingAverage:', newRatingAverage, 'newRatings:', newRatings)
        // console.log('newPros:', newPros, 'newCons:', newCons)
        this.setState({
          reviews: reviews,
          ratingAverage: newRatingAverage,
          ratings: newRatings,
          pros: newPros,
          cons: newCons
        })
      })
      .catch(err => {
        console.log('axios getreviews error:', err)
      })
  }

  render() {
    return (
      <div className="graph-component">
        <CenteredGrid 
          ratings={this.state.ratings} 
          ratingAverage={this.state.ratingAverage}
          reviews={this.state.reviews}
          pros={this.state.pros} 
          cons={this.state.cons}
        />
      </div>
    )
  }
}

export default App;