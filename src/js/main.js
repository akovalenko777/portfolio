import PhotoSwipeLightbox from './photoswipe/photoswipe-lightbox.esm.min.js';
import PhotoSwipe from './photoswipe/photoswipe.esm.min.js';

document.querySelector('.hamburger').addEventListener('click', (e) => {
  document.body.classList.toggle('open-menu')
})

document.querySelectorAll('.mobile-nav a').forEach(mobLink => {
  mobLink.addEventListener('click', () => document.body.classList.remove('open-menu'))
})

const lightbox = new PhotoSwipeLightbox({
  gallery: '#project-gallery',
  children: 'a',
  pswpModule: () => PhotoSwipe
});


const el = (id) => document.getElementById(id)

const modal = el('project-dialog')
const backdrop = el('dialog-backdrop')
document.addEventListener('click', (e) => {
  if(e.target.classList.contains('detail-info-link')){
    el('dialog-project-title').innerText = e.target.dataset.title
    const template = el(e.target.dataset.template)
    const clone = document.importNode(template.content, true)
    el('project-modal-content').appendChild(clone)
    lightbox.init();
    modal.classList.add('open')
    modal.setAttribute('aria-modal', 'true')
    backdrop.classList.add('show')
  }
})

const closeModal = () => {
  modal.classList.remove('open')
  modal.setAttribute('aria-modal', 'false')
  backdrop.classList.remove('show')
  el('project-modal-content').innerHTML = ''
}

el('close-dialog').addEventListener('click', () => {
  closeModal()
})

document.addEventListener('keydown', (e) => {
  if(e.code === 'Escape' && modal.classList.contains('open') && !document.querySelector('.pswp--open')) closeModal()
})