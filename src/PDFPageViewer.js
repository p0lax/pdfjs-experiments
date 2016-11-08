import React, {Component} from 'react'
import { DEFAULT_PDF_URL, PAGE_TO_VIEW, SCALE } from './constants';


class PDFPageViewer extends Component {

  componentDidMount() {
    const container = this.refs.container;
    PDFJS.getDocument(DEFAULT_PDF_URL).then((pdfDocument) => {
      return pdfDocument.getPage(PAGE_TO_VIEW).then((pdfPage) => {
        const pdfPageView = new PDFJS.PDFPageView({
        container: container,
        id: PAGE_TO_VIEW,
        scale: SCALE,
        defaultViewport: pdfPage.getViewport(SCALE)
      });

        pdfPageView.setPdfPage(pdfPage);
        this.pdfPageView = pdfPageView;
        return pdfPageView.draw();
      });
    });
  }

  onClickHandler = () => {
    this.pdfPageView.currentScaleValue = 2.0;
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