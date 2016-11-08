import React, {Component} from 'react'
import { DEFAULT_PDF_URL, PAGE_TO_VIEW, SCALE } from './constants';


class componentName extends Component {

  componentDidMount() {
    const container = this.refs.container;
    PDFJS.getDocument(DEFAULT_PDF_URL).then(function (pdfDocument) {
      return pdfDocument.getPage(PAGE_TO_VIEW).then(function (pdfPage) {
        var pdfPageView = new PDFJS.PDFPageView({
        container: container,
        id: PAGE_TO_VIEW,
        scale: SCALE,
        defaultViewport: pdfPage.getViewport(SCALE)
        });

        pdfPageView.setPdfPage(pdfPage);
        return pdfPageView.draw();
      });
    });
  }

  render () {
    return (
        <div 
          ref="container" 
          style={{ width: '400px', border: '1px solid #000', height: '600px' }}
        ></div>
    )
  }
}

export default componentName