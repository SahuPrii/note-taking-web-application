import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { getNotes, createNote, updateNote, deleteNote } from '../api/notes';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const fetchNotes = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await getNotes(searchTerm ? { search: searchTerm } : {});
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchNotes(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search, fetchNotes]);

  const openCreateModal = () => {
    setEditingNote(null);
    setModalOpen(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setModalOpen(true);
  };

  const handleSave = async (noteData) => {
    try {
      if (editingNote) {
        const { data } = await updateNote(editingNote._id, noteData);
        setNotes((prev) => prev.map((n) => (n._id === data._id ? data : n)));
      } else {
        const { data } = await createNote(noteData);
        setNotes((prev) => [data, ...prev]);
      }
      setModalOpen(false);
      setEditingNote(null);
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      setError('Failed to delete note. Please try again.');
    }
  };

  const handleTogglePin = async (note) => {
    try {
      const { data } = await updateNote(note._id, { pinned: !note.pinned });
      setNotes((prev) =>
        prev
          .map((n) => (n._id === data._id ? data : n))
          .sort((a, b) => (b.pinned === a.pinned ? 0 : b.pinned ? 1 : -1))
      );
    } catch (err) {
      setError('Failed to update note.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={openCreateModal}>
            + New Note
          </button>
        </div>

        {error && <div className="error-text">{error}</div>}

        {loading ? (
          <div className="page-loader">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onTogglePin={handleTogglePin}
              />
            ))}
          </div>
        )}
      </div>

      <NoteModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSave}
        initialNote={editingNote}
      />
    </div>
  );
};

export default Dashboard;
