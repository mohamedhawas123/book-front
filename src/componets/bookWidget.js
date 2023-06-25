import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const BookWidget = ({ title, author, click, handleEdit,handleDelete, showEdit  }) => {
  return (
    <Card o style={{ width: '18rem', margin: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
      <Card.Img onClick={click} variant="top" src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781787550360/classic-book-cover-foiled-journal-9781787550360_hr.jpg" />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</Card.Title>
        <Card.Text style={{ color: '#777', fontStyle: 'italic' }}>
          By {author}
        </Card.Text>
        
      {showEdit==true &&

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<FontAwesomeIcon icon={faEdit} style={{ cursor: 'pointer', color: 'blue' }} onClick={handleEdit} />
<FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer', color: 'red' }} onClick={handleDelete} />
</div>

      }  
      </Card.Body>
    </Card>
  );
};

export default BookWidget;
