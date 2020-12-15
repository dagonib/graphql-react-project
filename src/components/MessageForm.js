import React, {useState} from 'react'
import {gql} from 'apollo-boost'
import {useMutation} from '@apollo/react-hooks'

const CREATE_MESSAGE = gql`
    mutation CreateMessage($title: String!, $content: String!, $author: String!) {
        createMessage(title: $title, content: $content, author: $author) {
            _id
        }
    }
`

const MessageForm = () =>  {
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')

    const [createMessage] = useMutation(CREATE_MESSAGE)

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={async e => {
                            e.preventDefault();
                            await createMessage({variables: {title, author, content}})
                            window.location.href="/"
                        }}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)} 
                                />
                            </div>

                            <div className="form-group">
                                <input 
                                    type="text" 
                                    placeholder="Write a Title" 
                                    className="form-control"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)} 
                                />
                            </div>
                            
                            <div className="form-group">
                                <textarea 
                                    rows="2" 
                                    placeholder="Content..." 
                                    className="form-control"
                                    value={content}
                                    onChange={e => setContent(e.target.value)} 
                                    />
                            </div>
                            <button className="btn btn-success btn-block">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default MessageForm;