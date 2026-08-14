const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={`note-card ${note.pinned ? 'pinned' : ''}`}>
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <button
          className="pin-btn"
          title={note.pinned ? 'Unpin note' : 'Pin note'}
          onClick={() => onTogglePin(note)}
        >
          {note.pinned ? '📌' : '📍'}
        </button>
      </div>
      <p className="note-content">{note.content}</p>
      {note.tags?.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag) => (
            <span className="tag" key={tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div className="note-card-footer">
        <span className="note-date">{formattedDate}</span>
        <div className="note-actions">
          <button className="btn btn-small" onClick={() => onEdit(note)}>
            Edit
          </button>
          <button className="btn btn-small btn-danger" onClick={() => onDelete(note._id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
