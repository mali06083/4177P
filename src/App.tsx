import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const initial: QuoteType[] = [];


function QuoteApp() {
  const [state, setState] = useState<QuoteType[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editDialogTodoId, setEditDialogTodoId] = useState<string | null>(null);
  const [editInputValue, setEditInputValue] = useState<string>("");

  const handleDelete = (index: number) => {
    const newState = [...state];
    newState.splice(index, 1);
    setState(newState.filter(quote => quote));
  };

  const handleAddQuote = () => {
    if (inputValue.trim()) {
      const newQuote: QuoteType = {
        id: nanoid(),
        content: inputValue,
      };
      setState([...state, newQuote]);
      setInputValue("");
    }
  };

  const handleEditQuote = (index: number) => {
    const quoteToEdit = state[index];
    setEditDialogTodoId(quoteToEdit.id);
    setEditInputValue(quoteToEdit.content);
  };

  const handleSaveEdit = () => {
    if (editDialogTodoId) {
      const updatedQuotes = state.map(quote => 
        quote.id === editDialogTodoId ? { ...quote, content: editInputValue } : quote
      );
      setState(updatedQuotes);
      setEditDialogTodoId(null);
      setEditInputValue("");
    }
  };

  const isEditDialogOpen = editDialogTodoId !== null;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return; 
    }

    const newState = Array.from(state); 
    const [removed] = newState.splice(result.source.index, 1); 
    newState.splice(result.destination.index, 0, removed); 

    setState(newState); 
  };

  return (
    <Container className="AppContainer">
      <h1 className="Title">Alıntı Listesi</h1>
      <Row>
        <Col md={8} className="mx-auto">
          <Form inline className="mb-3">
            <Form.Control 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Yeni alıntı ekle" 
              className="mr-2"
            />
            <Button onClick={handleAddQuote}>Ekle</Button>
          </Form>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {state.map((quote, index) => (
                    <Draggable key={quote.id} draggableId={quote.id} index={index}>
                      {(provided) => (
                        <div className="QuoteItem" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{quote.content}</span>
                            <div>
                              <Button className="DeleteButton" variant="danger" onClick={() => handleDelete(index)}>Sil</Button>
                              <Button className="EditButton" variant="warning" onClick={() => handleEditQuote(index)}>Düzenle</Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

      
          <Modal show={isEditDialogOpen} onHide={() => setEditDialogTodoId(null)}>
            <Modal.Header closeButton>
              <Modal.Title>Düzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Control 
                type="text" 
                value={editInputValue} 
                onChange={(e) => setEditInputValue(e.target.value)} 
                placeholder="Düzenle" 
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setEditDialogTodoId(null)}>
                Kapat
              </Button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Kaydet
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}


export default QuoteApp; 

