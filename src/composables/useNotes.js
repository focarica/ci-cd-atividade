import { ref } from 'vue'

const STORAGE_KEY = 'bloco-de-notas:notes'

function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function persist(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Composable responsável por toda a lógica do bloco de notas.
 * Não depende de nenhum backend: tudo é mantido em memória (ref)
 * e persistido no localStorage do navegador.
 */
export function useNotes() {
  const notes = ref(loadNotes())

  function addNote(title, content) {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) {
      throw new Error('O título da nota não pode ser vazio.')
    }

    const note = {
      id: generateId(),
      title: trimmedTitle,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }

    notes.value = [note, ...notes.value]
    persist(notes.value)
    return note
  }

  function removeNote(id) {
    notes.value = notes.value.filter((note) => note.id !== id)
    persist(notes.value)
  }

  function updateNote(id, { title, content } = {}) {
    notes.value = notes.value.map((note) =>
      note.id === id
        ? {
            ...note,
            title: title !== undefined ? title : note.title,
            content: content !== undefined ? content : note.content,
          }
        : note
    )
    persist(notes.value)
  }

  return { notes, addNote, removeNote, updateNote }
}
