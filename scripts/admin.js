let editingId = null;

function showToast(msg, type = 'default') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast ' + type;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

function renderList() {
  const services = db.getAll();
  const list = document.getElementById('services-list');
  const counter = document.getElementById('services-count');
  counter.textContent = services.length + ' خدمة';

  if (services.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-text">لا توجد خدمات بعد. أضف خدمتك الأولى!</div>
      </div>`;
    return;
  }

  list.innerHTML = services.map(s => `
    <div class="service-row" data-id="${s.id}">
      <div class="service-row-content">
        <div class="service-row-name">${s.name}</div>
        <div class="service-row-description">${s.description}</div>
      </div>
      <div class="service-row-actions">
        <button class="btn-icon edit" onclick="openEditModal(${s.id})" title="تعديل">✎</button>
        <button class="btn-icon delete" onclick="openDeleteModal(${s.id})" title="حذف">✕</button>
      </div>
    </div>
  `).join('');
}

function resetAddForm() {
  document.getElementById('add-name').value = '';
  document.getElementById('add-description').value = '';
}

function handleAdd() {
  const name = document.getElementById('add-name').value.trim();
  const description = document.getElementById('add-description').value.trim();

  if (!name || !description) {
    showToast('يرجى تعبئة اسم الخدمة والوصف', 'error');
    return;
  }

  db.add({ name, description });
  resetAddForm();
  renderList();
  showToast('تمت إضافة الخدمة بنجاح ✓', 'success');
}

function openEditModal(id) {
  const services = db.getAll();
  const service = services.find(s => s.id === id);
  if (!service) return;

  editingId = id;
  document.getElementById('edit-name').value = service.name;
  document.getElementById('edit-description').value = service.description;

  document.getElementById('edit-modal').classList.add('open');
}

function closeEditModal() {
  editingId = null;
  document.getElementById('edit-modal').classList.remove('open');
}

function handleEdit() {
  if (!editingId) return;
  const name = document.getElementById('edit-name').value.trim();
  const description = document.getElementById('edit-description').value.trim();

  if (!name || !description) {
    showToast('يرجى تعبئة جميع الحقول', 'error');
    return;
  }

  db.update(editingId, { name, description });
  closeEditModal();
  renderList();
  showToast('تم تحديث الخدمة بنجاح ✓', 'success');
}

let deletingId = null;

function openDeleteModal(id) {
  const service = db.getAll().find(s => s.id === id);
  if (!service) return;
  deletingId = id;
  document.getElementById('delete-service-name').textContent = service.name;
  document.getElementById('delete-modal').classList.add('open');
}

function closeDeleteModal() {
  deletingId = null;
  document.getElementById('delete-modal').classList.remove('open');
}

function handleDelete() {
  if (!deletingId) return;
  db.remove(deletingId);
  closeDeleteModal();
  renderList();
  showToast('تم حذف الخدمة', 'default');
}

function handleReset() {
  if (!confirm('هل أنت متأكد من إعادة تعيين جميع الخدمات إلى الافتراضية؟')) return;
  db.reset();
  renderList();
  showToast('تم إعادة التعيين إلى الخدمات الافتراضية', 'default');
}

document.addEventListener('DOMContentLoaded', () => {
  renderList();

  document.getElementById('edit-modal').addEventListener('click', function (e) {
    if (e.target === this) closeEditModal();
  });

  document.getElementById('delete-modal').addEventListener('click', function (e) {
    if (e.target === this) closeDeleteModal();
  });
});