
export const iFramePrinter = (elementToPrint) => {

    var content = document.getElementById(elementToPrint);
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    

    pri.document.write(content.innerHTML);
    
    var cssLink = document.createElement("link");
    cssLink.href = "/printStyles.css"; 
    cssLink.rel = "stylesheet"; 
    cssLink.type = "text/css"; 
    
    pri.document.head.appendChild(cssLink);
   
    pri.document.close();
    const printframe = () =>{
        pri.focus();
        pri.print();
    }
    setTimeout(printframe,1000);

}