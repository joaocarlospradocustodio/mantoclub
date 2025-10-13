// CONFIG - ajuste seu número (formato +55DDDNNNNNNNN)
const CONFIG = { phone: '+55S+5567991829929', storeName: 'Manto Club', currency: 'R$' }

// Produtos de exemplo (imagens genéricas pra modelo). Substitua conforme necessário.
const PRODUCTS = [
    { id: 1, title: 'Camisa Seleção Brasileita 2025', team: 'Seleção', price: 120.00, imgs: ['https://acdn-us.mitiendanube.com/stores/001/402/723/products/79805462df-22e9b823b924ea775f17399068160035-1024-1024.webp'], desc: 'Camisa Seleção Brasileira 2025, modelo Jogador', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 2, title: 'Camisa Flamengo - 3° Uniforme', team: 'Brasileirão', price:120.00, imgs: ['https://acdn-us.mitiendanube.com/stores/001/402/723/products/2025081916485051-2c92d8e1567ba5100d17557061990667-1024-1024.webp'], desc: '3° Uniforme Flamengo 2025 - Branco e Dourado', sizes: ['P', 'M', 'G','GG'] },
    { id: 3, title: 'Camisa Real Madrid', team: 'LaLiga', price: 140.00, imgs: ['https://acdn-us.mitiendanube.com/stores/002/536/162/products/camisa-real-madrid-home-25-26-adidas-versao-jogador-masculina-branca-imagem1-jpg-5cb79815b787d0c56717369058656312-1024-1024.webp','https://acdn-us.mitiendanube.com/stores/002/536/162/products/camisa-real-madrid-home-25-26-adidas-versao-jogador-masculina-branca-imagem2-jpg-e5ffe6149e7d7dcb2917369058656420-1024-1024.webp'], desc: 'Camisa Real Madrid 25/26 - Primeiro Uniforme', sizes: ['P','M', 'G', 'GG'] },
    { id: 4, title: 'Camisa Edição Limitada', team: 'Clássicos', price: 399.9, imgs: ['https://images.unsplash.com/photo-1517927033932-b3d18e8a6f35?auto=format&fit=crop&w=900&q=60'], desc: 'Peça numerada. Estoque limitado', sizes: ['M', 'G'] },
    { id: 5, title: 'Camisa Retrô - Time B', team: 'Time B', price: 179.9, imgs: ['https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=900&q=60'], desc: 'Design retrô clássico', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 6, title: 'Camisa Torcedor - Time C', team: 'Time C', price: 149.9, imgs: ['https://images.unsplash.com/photo-1520975891234-1c1e3e6b1d3f?auto=format&fit=crop&w=900&q=60'], desc: 'Perfeita pra passeios e jogos', sizes: ['P', 'M', 'G'] },
    { id: 7, title: 'Camisa Arena - Time D', team: 'Time D', price: 219.9, imgs: ['https://images.unsplash.com/photo-1520975888726-0b1f9d6b4e2b?auto=format&fit=crop&w=900&q=60'], desc: 'Tecido Dry-fit', sizes: ['P', 'M', 'G', 'GG'] },
    { id: 8, title: 'Camisa Especial - Aniversário', team: 'Manto Club', price: 299.9, imgs: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=60'], desc: 'Edição comemorativa do clube', sizes: ['M', 'G'] },
    { id: 9, title: 'Camisa Retro - Time E', team: 'Time D', price: 159.9, imgs: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=60'], desc: 'Ícone retrô dos anos 90', sizes: ['P', 'M', 'G'] },
    { id: 10, title: 'Camisa Fan - Time E', team: 'Time D', price: 139.9, imgs: ['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=60'], desc: 'Ótima para torcer no estádio', sizes: ['P', 'M', 'G', 'GG'] }
]

// Estado
let state = { q: '', team: '', maxPrice: 500, sizes: new Set() }

// DOM refs
const grid = document.getElementById('productsGrid')
const teamFilter = document.getElementById('teamFilter')
const searchInput = document.getElementById('searchInput')
const priceRange = document.getElementById('priceRange')
const priceVal = document.getElementById('priceVal')
const sizeFilters = document.getElementById('sizeFilters')
const productsCount = document.getElementById('productsCount')
const emptyState = document.getElementById('emptyState')

// Filtro de Opções de camisa
const teams = Array.from(new Set(PRODUCTS.map(p => p.team))).sort()
teams.forEach(t => { const opt = document.createElement('option'); opt.value = t; opt.innerText = t; teamFilter.appendChild(opt) })

// Tamanho das Peças
const sizeOrder = ['P', 'M', 'G', 'GG'];
const allSizes = Array.from(new Set(PRODUCTS.flatMap(p => p.sizes)))
allSizes.forEach(s => {
    const btn = document.createElement('button'); btn.className = 'pill btn'; btn.innerText = s
    btn.onclick = () => { if (state.sizes.has(s)) { state.sizes.delete(s); btn.classList.remove('primary') } else { state.sizes.add(s); btn.classList.add('primary') } render() }
    sizeFilters.appendChild(btn)
}) 

// event listeners
searchInput.addEventListener('input', () => { state.q = searchInput.value.trim().toLowerCase(); render() })
teamFilter.addEventListener('change', () => { state.team = teamFilter.value; render() })
priceRange.addEventListener('input', () => { state.maxPrice = Number(priceRange.value); priceVal.innerText = CONFIG.currency + state.maxPrice; render() })

// render products
function render() {
    const filtered = PRODUCTS.filter(p => {
        if (state.q) { const q = state.q; if (!(p.title.toLowerCase().includes(q) || p.team.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))) return false }
        if (state.team && p.team !== state.team) return false
        if (p.price > state.maxPrice) return false
        if (state.sizes.size > 0) { const inter = p.sizes.some(s => state.sizes.has(s)); if (!inter) return false }
        return true
    })

    grid.innerHTML = ''
    productsCount.innerText = `${filtered.length} produto(s)`
    if (filtered.length === 0) { emptyState.style.display = 'block'; return } else { emptyState.style.display = 'none' }

    filtered.forEach(p => {
        const el = document.createElement('div'); el.className = 'card'
        el.innerHTML = `
    <img src="${p.imgs[0]}" alt="${p.title}" />
    <h3>${p.title}</h3>
    <div class="muted">${p.team}</div>
    <div class="meta"><div class="price">${CONFIG.currency}${p.price.toFixed(2).replace('.', ',')}</div><div class="badge">${p.sizes.join(' • ')}</div></div>
    <div class="actions"><button class="btn" onclick='openModal(${p.id})'>Ver</button><button class="btn primary" onclick='buyWhats(${p.id})'>Comprar</button></div>
    `
        grid.appendChild(el)
    })
}

// modal logic
const modal = document.getElementById('productModal')
const modalMainImg = document.getElementById('modalMainImg')
const modalThumbs = document.getElementById('modalThumbs')
const modalTitle = document.getElementById('modalTitle')
const modalTeam = document.getElementById('modalTeam')
const modalPrice = document.getElementById('modalPrice')
const modalDesc = document.getElementById('modalDesc')
const modalSizes = document.getElementById('modalSizes')
let current = null

window.openModal = function (id) {
    const p = PRODUCTS.find(x => x.id === id); if (!p) return
    current = p
    modalMainImg.src = p.imgs[0]
    modalThumbs.innerHTML = ''
    p.imgs.forEach(u => { const i = document.createElement('img'); i.src = u; i.onclick = () => modalMainImg.src = u; modalThumbs.appendChild(i) })
    modalTitle.innerText = p.title
    modalTeam.innerText = p.team
    modalPrice.innerText = `${CONFIG.currency}${p.price.toFixed(2).replace('.', ',')}`
    modalDesc.innerText = p.desc
    modalSizes.innerHTML = ''
    p.sizes.forEach(s => { const b = document.createElement('button'); b.className = 'pill btn'; b.innerText = s; b.onclick = () => { document.querySelectorAll('#modalSizes .btn').forEach(x => x.classList.remove('primary')); b.classList.add('primary'); b.dataset.size = s }; modalSizes.appendChild(b) })
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false')
}
document.getElementById('closeModal').onclick = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true') }

// buy via WhatsApp (single product)
window.buyWhats = function (id) {
    const p = PRODUCTS.find(x => x.id === id); if (!p) return
    const msg = `Ol%C3%A1%20${encodeURIComponent(CONFIG.storeName)}!%20Gostaria%20de%20comprar%20o%20produto%3A%0A- ${encodeURIComponent(p.title)}%20(${encodeURIComponent(p.team)})%0APre%C3%A7o%3A%20${encodeURIComponent(CONFIG.currency + p.price.toFixed(2).replace('.', ','))}%0A%0A*Dados%20para%20entrega*%3A%20Nome%3A%2C%20Endere%C3%A7o%3A%2C%20Telefone%3A`
    const url = `https://api.whatsapp.com/send/?phone=5567981315973&text&type=phone_number&app_absent=0, '')}?text=${msg}`
    window.open(url, '_blank')
}

// modal buy (uses selected size)
document.getElementById('buyWhatsapp').onclick = () => {
    if (!current) return
    const selected = Array.from(document.querySelectorAll('#modalSizes .btn.primary')).map(b => b.innerText)[0] || '-'
    const msg = `Ol%C3%A1%20${encodeURIComponent(CONFIG.storeName)}!%20Gostaria%20de%20comprar%20o%20produto%3A%0A- ${encodeURIComponent(current.title)}%20(${encodeURIComponent(current.team)})%20Tamanho%3A%20${encodeURIComponent(selected)}%0APre%C3%A7o%3A%20${encodeURIComponent(CONFIG.currency + current.price.toFixed(2).replace('.', ','))}%0A%0A*Dados%20para%20entrega*%3A%20Nome%3A%2C%20Endere%C3%A7o%3A%2C%20Telefone%3A`
    const url = `https://api.whatsapp.com/send/?phone=556781315973&text&type=phone_number&app_absent=0, '')}?text=${msg}`
    window.open(url, '_blank')
}

// initial render
priceRange.value = 1000; priceVal.innerText = CONFIG.currency + priceRange.value
render()

// fallback for images
document.querySelectorAll('img').forEach(img => { img.onerror = () => { img.src = 'https://via.placeholder.com/800x600/0b0b0b/ffffff?text=Manto+Club' } })
