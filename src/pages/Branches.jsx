import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import FormField, { Input, Select } from '../components/ui/FormField'
import styles from './ListPage.module.css'

const EMPTY = { name: '', location: '', adminId: '', phone: '', email: '', status: 'Active' }

export default function Branches() {
  const { branches, students, teachers, classes, addBranch, updateBranch, deleteBranch } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY)

  const filtered = branches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  )

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleEdit(e, branch) {
    e.stopPropagation()
    setEditing(branch.id)
    setForm({ ...branch })
    setShowForm(true)
  }

  function handleDelete(e, id) {
    e.stopPropagation()
    deleteBranch(id)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      updateBranch(editing, form)
    } else {
      addBranch(form)
    }
    setForm(EMPTY)
    setEditing(null)
    setShowForm(false)
  }

  function handleClose() {
    setForm(EMPTY)
    setEditing(null)
    setShowForm(false)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            placeholder="Search branches"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Button icon={<Plus size={16} />} onClick={() => setShowForm(true)}>
          Add Branch
        </Button>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Branch Name</th>
              <th>Location</th>
              <th>Branch Admin</th>
              <th>Classes</th>
              <th>Students</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="7" className={styles.empty}>No branches found.</td></tr>
            ) : (
              filtered.map((b, i) => {
                const admin = teachers.find((t) => t.id === b.adminId)
                const branchClasses = classes.filter((c) => c.branchId === b.id).length
                const branchStudents = students.filter((s) => s.branchId === b.id).length
                return (
                  <tr
                    key={b.id}
                    onClick={() => navigate(`/branches/${b.id}`)}
                    style={{ cursor: 'pointer' }}
                    className={styles.clickableRow}
                  >
                    <td className={styles.num}>{i + 1}</td>
                    <td className={styles.name}>{b.name}</td>
                    <td>{b.location}</td>
                    <td>{admin ? admin.name : <span className={styles.muted}>—</span>}</td>
                    <td>{branchClasses}</td>
                    <td>{branchStudents}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className={styles.deleteBtn} onClick={(e) => handleEdit(e, b)} aria-label="Edit branch">
                          <Pencil size={14} />
                        </button>
                        <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, b.id)} aria-label="Delete branch">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <p className={styles.count}>{filtered.length} branch{filtered.length !== 1 ? 'es' : ''}</p>

      <Modal isOpen={showForm} onClose={handleClose} title={editing ? 'Edit Branch' : 'Add New Branch'}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <FormField label="Branch Name" required>
            <Input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Lusaka Main" required />
          </FormField>
          <FormField label="Location" required>
            <Input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Lusaka, Zambia" required />
          </FormField>
          <div className={styles.row2}>
            <FormField label="Phone">
              <Input name="phone" value={form.phone} onChange={handleChange} placeholder="0211-000-000" />
            </FormField>
            <FormField label="Email">
              <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="branch@school.zm" />
            </FormField>
          </div>
          <FormField label="Status">
            <Select name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Inactive</option>
            </Select>
          </FormField>
          <div className={styles.formActions}>
            <Button variant="secondary" type="button" onClick={handleClose}>Cancel</Button>
            <Button type="submit">{editing ? 'Save Changes' : 'Add Branch'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}