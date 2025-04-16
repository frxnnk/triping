document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-sidebar-btn');
  const appLayout = document.querySelector('.app-layout');
  
  if (toggleBtn) {
    // Configurar estado inicial
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
      appLayout.classList.add('sidebar-collapsed');
      toggleBtn.querySelector('.fa-chevron-left').style.display = 'none';
      toggleBtn.querySelector('.fa-chevron-right').style.display = 'block';
    }
    
    // Función toggle
    function toggleSidebar() {
      appLayout.classList.toggle('sidebar-collapsed');
      
      const isCollapsed = appLayout.classList.contains('sidebar-collapsed');
      toggleBtn.querySelector('.fa-chevron-left').style.display = isCollapsed ? 'none' : 'block';
      toggleBtn.querySelector('.fa-chevron-right').style.display = isCollapsed ? 'block' : 'none';
      
      localStorage.setItem('sidebarCollapsed', isCollapsed);
      
      if (window.innerWidth <= 768 && isCollapsed) {
        document.querySelector('.main-content').scrollIntoView({behavior: 'smooth'});
      }
    }
    
    // Eventos
    toggleBtn.addEventListener('click', toggleSidebar);
    toggleBtn.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
    
    console.log('Sidebar toggle initialized successfully');
  }
}); 