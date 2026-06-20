<script setup>
import { useNotes } from './composables/useNotes'
import NoteForm from './components/NoteForm.vue'
import NoteList from './components/NoteList.vue'

const { notes, addNote, removeNote, updateNote } = useNotes()

function handleAdd({ title, content }) {
  addNote(title, content)
}
</script>

<template>
  <main class="app">
    <header class="app__header">
      <h1>📝 Bloco de Notas do Artur</h1>
      <p>Suas notas ficam salvas apenas neste navegador (localStorage). Não há banco de dados.</p>
    </header>

    <NoteForm @add="handleAdd" />

    <NoteList
      :notes="notes"
      @remove="removeNote"
      @update="(id, payload) => updateNote(id, payload)"
    />
  </main>
</template>

<style>
:root {
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  color-scheme: light;
}

body {
  margin: 0;
  background: #f4f5f7;
}

.app {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1rem 4rem;
}

.app__header h1 {
  margin-bottom: 0.25rem;
}

.app__header p {
  color: #666;
  margin-top: 0;
}
</style>
