import React, {Component} from 'react'
import { DEFAULT_PDF_URL, PAGE_TO_VIEW, SCALE, DEFAULT_SEARCH_STRING } from './constants';


class PDFPageViewer extends Component {

  createFakePDFViewer() {
    const fakeContainer = document.createElement('div');
    const fakeInner = document.createElement('div');
    const doc = document.body; // document.createDocumentFragment();
    fakeContainer.appendChild(fakeInner);
    fakeContainer.className = 'hidden';
    doc.appendChild(fakeContainer);
    const textLayerFactory = new PDFJS.DefaultTextLayerFactory();
    const pdfViewer = new PDFJS.PDFViewer({ 
      container: fakeContainer,
      textLayerFactory: textLayerFactory,
      annotationLayerFactory: new PDFJS.DefaultAnnotationLayerFactory()
    });
    PDFJS.getDocument(DEFAULT_PDF_URL).then((pdfDocument) => {
      pdfViewer.setDocument(pdfDocument);
      console.log(fakeContainer);
      
      this.pdfFindController = new PDFJS.PDFFindController({ pdfViewer: pdfViewer });
      pdfViewer.setFindController(this.pdfFindController);
      this.pdfFindController.executeCommand('find', { query: DEFAULT_SEARCH_STRING });
      
      this.pdfFindController.onUpdateResultsCount = (matchCount) => {
        console.log(matchCount);
        console.log(this.pdfFindController);
        console.log(doc);
        console.log(textLayerFactory);
      };
    });
  }

  drawColoredRect(pageData, viewport) {
    const pageScale = viewport.scale;
    const firstItem = pageData.items[0];
    const viewportMatrix = viewport.transform;
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
  }

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
          this.drawColoredRect(data, pdfPageView.viewport);
        });
        pdfPageView.setPdfPage(pdfPage);
        this.pdfPageView = pdfPageView;
        return pdfPageView.draw();
      });
    });

    this.createFakePDFViewer();
  }

  render () {
    return (
        <div ref="container" className="container"></div>
    )
  }
}

export default PDFPageViewer;