import React, {Component} from 'react'
import { DEFAULT_PDF_URL, PAGE_TO_VIEW, SCALE } from './constants';


class PDFPageViewer extends Component {

  componentDidMount() {
    const container = this.refs.container;
    PDFJS.getDocument(DEFAULT_PDF_URL).then((pdfDocument) => {
      pdfDocument.getData().then((data) => { console.log('pdfDocument.getData', data) });
      return pdfDocument.getPage(PAGE_TO_VIEW).then((pdfPage) => {
        const pdfPageView = new PDFJS.PDFPageView({
          container: container,
          id: PAGE_TO_VIEW,
          scale: SCALE,
          defaultViewport: pdfPage.getViewport(SCALE),
          textLayerFactory: new PDFJS.DefaultTextLayerFactory(),
          annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
        });
        pdfPage.getAnnotations().then((data) => { console.log('getAnnotations', data) });
        pdfPage.getTextContent().then((data) => { 
          console.log('getTextContent', data, pdfPageView);
          const pageScale = pdfPageView.viewport.scale;
          const firstItem = data.items[0];
          const viewportMatrix = pdfPageView.viewport.transform;
          const itemMatrix = firstItem.transform;

          const coordinates = PDFJS.Util.transform(viewportMatrix, itemMatrix);
          
          const div = document.createElement('div');
          div.className = 'hightlight';
          div.style.position = 'absolute';
          div.style.left = `${coordinates[4]}px`;
          div.style.top = `${coordinates[5]}px`;
          div.style.height = `${firstItem.height * pageScale}px`;
          div.style.width = `${firstItem.width * pageScale}px`;
          
          console.log('coordinates', coordinates);
          document.body.appendChild(div);
        });
        pdfPageView.setPdfPage(pdfPage);
        this.pdfPageView = pdfPageView;
        return pdfPageView.draw();
      });
    });
  }

  render () {
    return (
        <div ref="container" className="container"></div>
    )
  }
}

export default PDFPageViewer;