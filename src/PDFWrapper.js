import React, { Component } from 'react';
import { DEFAULT_PDF_URL, DEFAULT_SEARCH_STRING } from './constants';
 
 class PDfWrapper extends Component {

   componentDidMount() {
    const { container } = this.refs;
    this.pdfViewer = new PDFJS.PDFViewer({ container });
    
    this.pdfFindController = new PDFJS.PDFFindController({ pdfViewer: this.pdfViewer });
    this.pdfViewer.setFindController(this.pdfFindController);
    container.addEventListener('pagesinit', () => {
      // We can use pdfViewer now, e.g. let's change default scale.
      this.pdfViewer.currentScaleValue = 'page-width';
      this.pdfFindController.executeCommand('find', { query: DEFAULT_SEARCH_STRING });
    });

    PDFJS.getDocument(DEFAULT_PDF_URL).then((pdfDocument) => {
      this.pdfViewer.setDocument(pdfDocument);
    });
   }

  onClickHandler = (data) => {
    this.pdfViewer;
    this.pdfFindController;
    
  }

  render() {
    
    
    return (
      <div ref="container" onClick={this.onClickHandler}>
        <div id="viewer" className="pdfViewer"></div>
      </div>
    )
  }

}

export default PDfWrapper;

