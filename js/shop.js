// Simple cart & auth logic for static site
(function(){
  const CART_KEY = 'tinTinCart';
  const USER_KEY = 'tinTinUser';

  function getCart(){
    try{ return JSON.parse(localStorage.getItem(CART_KEY))||[] }catch(e){return []}
  }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartCount(); }

  window.addToCart = function(item){
    const cart = getCart();
    const existing = cart.find(i=>i.id===item.id);
    if(existing) existing.qty += (item.qty||1);
    else cart.push(Object.assign({qty: item.qty||1}, item));
    saveCart(cart);
    alert(item.name + ' sepete eklendi.');
  }

  window.updateCartCount = function(){
    const cart = getCart();
    const total = cart.reduce((s,i)=>s + (i.qty||0),0);
    const el = document.getElementById('cartCount');
    if(el) el.textContent = total;
  }

  window.showCartModal = function(){
    renderCart();
    const modal = document.getElementById('cartModal');
    if(modal) modal.classList.add('show');
  }
  window.closeCartModal = function(){
    const modal = document.getElementById('cartModal');
    if(modal) modal.classList.remove('show');
  }

  function renderCart(){
    const cart = getCart();
    const tbody = document.getElementById('cartItems');
    if(!tbody) return;
    tbody.innerHTML = '';
    if(cart.length===0){
      tbody.innerHTML = '<tr><td colspan="4">Sepetiniz boş.</td></tr>';
      return;
    }
    cart.forEach(item=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.name}</td><td style="text-align:center">${item.qty}</td><td>${item.price ? item.price+' TL' : '-'}</td><td style="text-align:right"><a href="#" onclick="removeFromCart('${item.id}');return false;">Kaldır</a></td>`;
      tbody.appendChild(tr);
    });
    const total = cart.reduce((s,i)=> s + ((i.price||0) * (i.qty||1)), 0);
    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `<td colspan="2"></td><td><strong>Toplam:</strong></td><td style="text-align:right"><strong>${total} TL</strong></td>`;
    tbody.appendChild(trTotal);
  }

  window.removeFromCart = function(id){
    let cart = getCart();
    cart = cart.filter(i=>i.id !== id);
    saveCart(cart);
    renderCart();
  }

  window.checkoutCart = function(){
    const user = getUser();
    if(!user){
      alert('Lütfen önce giriş yapın.');
      openLoginModal();
      return;
    }
    const cart = getCart();
    if(cart.length===0){ alert('Sepet boş.'); return; }
    // Simulate checkout
    console.log('Checkout for', user, cart);
    alert('Teşekkürler, sepetiniz başarıyla tamamlandı.');
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    closeCartModal();
  }

  function getUser(){
    try{ return JSON.parse(localStorage.getItem(USER_KEY))||null }catch(e){return null}
  }
  function saveUser(u){ localStorage.setItem(USER_KEY, JSON.stringify(u)); updateUserLabel(); }
  window.openLoginModal = function(){ const modal = document.getElementById('loginModal'); if(modal) modal.classList.add('show'); }
  window.closeLoginModal = function(){ const modal = document.getElementById('loginModal'); if(modal) modal.classList.remove('show'); }

  document.addEventListener('DOMContentLoaded', function(){
    // wire login form if present
    const form = document.getElementById('loginForm');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        // VERY simple auth: store email only
        saveUser({email: email});
        alert('Giriş başarılı: ' + email);
        closeLoginModal();
      });
    }

    // show logout if user logged
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn){ logoutBtn.addEventListener('click', function(e){ e.preventDefault(); localStorage.removeItem(USER_KEY); updateUserLabel(); }); }

    updateCartCount();
    updateUserLabel();
  });

  function updateUserLabel(){
    const user = getUser();
    const label = document.getElementById('userLabel');
    if(label){
      if(user && user.email){
        label.textContent = user.email.split('@')[0];
        // change user button to offer logout on click
        const userBtn = document.getElementById('userButton');
        if(userBtn) userBtn.setAttribute('title','Hesabınız: '+user.email);
      } else {
        label.textContent = 'Giriş';
      }
    }
  }

})();

function sendMessage(e) {
    e.preventDefault();

    alert("🐾 Mesajınız alınmıştır. En kısa sürede dönüş yapılacaktır. Teşekkür ederiz!");

    e.target.reset();
}

