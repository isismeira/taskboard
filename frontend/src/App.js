import React, { useState, useEffect } from 'react'

import api from './services/api'

import './app.css'
import './global.css'
import './sidebar.css'
import './main.css'

import Notes from './Components/Notes'
import RadioButton from './Components/RadioButton'

function App() {

  const [ selectedValue, setSelectedValue ] = useState('all')
  const [ title, setTitles ] = useState('')
  const [ notes, setNotes ] = useState('')
  const [ allNotes, setAllNotes ] = useState([])

  useEffect(() => {
    getAllNotes()
  }, [])

  async function getAllNotes(){
    const response = await api.get('/annotations')

    setAllNotes(response.data)
  }

  // recebe a opção (true ou false)
  async function loadNotes(option) {
    // guarda o objeto cuja priority for de acordo com a option
    const params = { priority: option }
    //sa response, vão vir todos os registros de true ou todos registros de false
    const response = await api.get('/priorities', { params })

    if (response) {
      setAllNotes(response.data)
    }
  }

  function handleChange(e) {
    setSelectedValue(e.value)

    // se o valor do Radio for para exbir cards com prioridade
    if(e.checked && e.value !== 'all') {
      // envia o valor da priority true (ou false) para a função loadNotes
      loadNotes(e.value)
    } else {
      getAllNotes()
    }
  } 

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`)

    if(deletedNote) {
      setAllNotes(allNotes.filter(note => note._id !== id))
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`)

    if (note && selectedValue !== 'all') {      
      loadNotes(selectedValue)
    } else if (note) {
      getAllNotes()
    }
  }


  async function handleSubmit(e){
    e.preventDefault()

    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitles('')
    setNotes('')

    if (selectedValue!== 'all') {
      getAllNotes()
    } else {
      setAllNotes([...allNotes, response.data])
    }
    setSelectedValue('all')
  }

  useEffect(()=>{
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = '#02495981'
      if (title && notes) {
        btn.style.background = '#024959'
      }
    }
    enableSubmitButton()
  }, [title, notes])

  return (
    <div id="app">
      <aside>
        <strong>TaskBoard</strong>

        <form onSubmit={handleSubmit}> 

          <div className="input-block">
              <label htmlFor="title">Titulo da Anotação</label>
              <input
                required
                maxLength="30"
                value={title}
                onChange={e => setTitles(e.target.value)}
              />
          </div>

          <div className="input-block"> 
            <label htmlFor="nota">Anotações</label>
            <textarea
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <button id="btn_submit" type="submit">Salvar</button>

        </form>
        <RadioButton 
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>
      <main>
        <ul>
          { allNotes.map(data => (
            <Notes
              key={data._id} 
              data={data} 
              handleDelete = {handleDelete}
              handleChangePriority = {handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App;
