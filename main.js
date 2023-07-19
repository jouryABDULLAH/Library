const tempQoute = document.getElementById('temp-qoute');
const addButton = document.getElementById('add-book')
// const deletButton = document.querySelector('.delet-button');
// const toggleRead = document.querySelector('.change-read-status');

let id = 0;

let Library = [];

function Book(title, author, NoP, readingStatus){
    this.title = title;
    this.author = author;
    this.NoP = NoP;
    this.readingStatus = readingStatus;
} 

function addBookToLibrary(title, author, NoP, readStatus){
    
    if(tempQoute.style.display != 'none'){
        tempQoute.style.display = 'none';
    }

    readStatus = readStatus.checked? true : false;
    
    console.log(`title: ${title} , author: ${author}, NoP: ${NoP}, read? : ${readStatus}`);
    let book = new Book(title, author, NoP, readStatus);
    Library.push(book);

    create(book);

    console.log(book);
}

function create(book){
    let card = document.createElement('div');

    let readingStatus = book.readingStatus? 'read' : 'not-read';
    currentID = id++;
    card.innerHTML= `
    
    <div class="book" id = "${currentID}">
                    <div class="book-title">Title: ${book.title}</div>
                    <hr>
                    <div class="book-author">Author: ${book.author}</div>
                    <hr>
                    <div class="NoP">number of pages: ${book.NoP}</div>
                    <hr>
                    <div class="book-card-buttons">
                        <button class="change-read-status" data-id="${currentID} ">change read status</button>
                        <button class="delet-button" data-id="${currentID} " >Delete Book</button>
                    </div>
                    <div class="reading-status ${readingStatus}">${readingStatus}</div>
                </div>

    `;

    document.getElementById('book-cards').append(card);
}

function deleteBook(book){
    console.log(book);
}


addButton.addEventListener('click',(e) => {
    e.preventDefault();
    let {target} = e;
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let NoP = document.getElementById('NoP');
    let readStatus = document.getElementById('readCheck');
    
    addBookToLibrary(title.value, author.value, NoP.value, readStatus);

    title.value = "";
    author.value = "";
    NoP.value = "";
    readStatus.checked = false;
});

document.addEventListener('click', (e) => {
    let {target} = e;

    if(target && target.classList.contains('delet-button')){
        if(confirm(`Ary You Sure You want To Delete?`)){
            let bookID = parseInt(target.dataset.id);
            document.getElementById(bookID).remove();
        }else{
            return;
        }
    }else if(target && target.classList.contains('change-read-status')){
        let bookID = parseInt(target.dataset.id);
        let readingStatusElement = document.getElementById(bookID).querySelector('.reading-status');
        let readingStatus = readingStatusElement.classList.contains('read')? 'read' : 'not-read';
        
        if(readingStatus === 'read'){
            readingStatusElement.classList.replace('read', 'not-read');
            readingStatusElement.innerText = 'not-read';
        }else{
            readingStatusElement.classList.replace('not-read', 'read');
            readingStatusElement.innerText = 'read';
        }
    }
});