<header class="banner">
  <div id="nav-container" class="container">
    <img class="f-right" alt="<?php bloginfo('name'); ?>" src="<?php echo get_bloginfo('template_directory');?>/assets/images/sub-logo.jpg" />
    <a class="brand" href="<?= esc_url(home_url('/')); ?>">
      <img alt="<?php bloginfo('name'); ?>" src="<?php echo get_bloginfo('template_directory');?>/assets/images/logo.jpg" />
    </a>
    <nav class="nav-primary">
      <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
      endif;
      ?>
      <div class="toggle-menu-wrap">
        <div id="toggle-menu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  </div>
  <div class="video-container ">
    <div class="container rel">
      <div class="video-overlay hr">
        <h1><?php the_field('video_background_title'); ?></h1>
        <p><?php the_field('video_background_text'); ?></p>
        <a id="video-ctrl" data-ctrl="pause" class="white" href="<?php the_field('video-ctrl'); ?>">
          <span id="icon" class="icon-pause"></span>
          <span id="label">PAUSE VIDEO</span>
        </a>
      </div>
    </div>
  </div>
</header>
