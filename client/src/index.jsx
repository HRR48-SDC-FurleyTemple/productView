import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import ImageGrid from './components/ImageGrid.jsx';
const axios = require('axios');
import GlobalStyle from './createGlobalStyle';
import ProductDetails from './components/ProductDetails.jsx';
import Sizes from './components/Sizes.jsx';
import styles from './styled.js';

const ModuleContainer  = styles.ModuleContainer;
class Service extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetails: null,
            closeModal: true,
            showModal: false,
            clickedImage: ['http:////placeimg.com/640/480/people']
        }
    }

    componentDidMount() {
        console.log(window.location.href)
        var currentUrl = window.location.href.split('/');
        console.log(currentUrl)

        let id = currentUrl[currentUrl.length - 1] ? currentUrl[currentUrl.length - 1] : currentUrl[currentUrl.length - 2]
        axios.get( id ? `/api/productView/products/${id}` : '/api/productView/products/1')
           .then((res) => {
               console.log(res);
               console.log(res.data[0]);
               return this.setState({productDetails: res.data[0]})
            })
           .catch((err) => console.error(err));
    }

    handleClick() {
        this.setState({showModal: !this.state.showModal})
    }

    closeModal() {
        if (this.state.showModal) this.setState({showModal: false});
        return
    }
    render() {
        return (
            <ModuleContainer onClick={() => this.closeModal()} className='moduleDisplay'>
                <GlobalStyle modalShowing={this.state.showModal}/>
                {this.state.productDetails ?
                <Fragment>
                    <ImageGrid images ={this.state.productDetails.imageUrls}/>
                    <ProductDetails bodyClicked={this.state.showModal} showModal={this.handleClick.bind(this)} product={this.state.productDetails}/>
                    <Sizes bodyClicked={this.state.showModal} showModal={this.handleClick.bind(this)} sizes={this.state.productDetails.sizes} image={this.state.productDetails.imageUrls[0]}/>
                </Fragment>
                : <div>Loading images...</div>}
            </ModuleContainer>
        )
    }
}

ReactDom.render(<Service />, document.getElementById('productView'))
