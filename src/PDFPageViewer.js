import React, {Component} from 'react'
import { DEFAULT_PDF_URL, PAGE_TO_VIEW, SCALE } from './constants';


class PDFPageViewer extends Component {

  componentDidMount() {
    const container = this.refs.container;
    PDFJS.getDocument(DEFAULT_PDF_URL).then((pdfDocument) => {
      // pdfDocument.getData().then((data) => {
      //   debugger
      // });
      return pdfDocument.getPage(PAGE_TO_VIEW).then((pdfPage) => {
        const pdfPageView = new PDFJS.PDFPageView({
          container: container,
          id: PAGE_TO_VIEW,
          scale: SCALE,
          defaultViewport: pdfPage.getViewport(SCALE)
        });
        // pdfPage.getTextContent().then((data) => {
        //   debugger
        // });
        pdfPageView.setPdfPage(pdfPage);
        this.pdfPageView = pdfPageView;
        return pdfPageView.draw();
      });
    });
  }

  onClickHandler = () => {
    this.pdfPageView.update(2.0);
  }

  render () {
    return (
        <div 
          onClick={this.onClickHandler}
          ref="container" 
          style={{ width: '400px', border: '1px solid #000', height: '600px' }}
        ></div>
    )
  }
}

export default PDFPageViewer;