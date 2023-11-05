<script>
  import GithubLogo from '$components/GithubLogo.svelte';
</script>

<footer>
  <div class="container">
    <div>
      Built with <span style="color: salmon;">♥</span> by
      <a href="https://github.com/pthorsson" target="_blank">@pthorsson</a>
    </div>
    <a
      href="https://github.com/pthorsson/paletteer.dev"
      target="_blank"
      class="icon-link"
    >
      <GithubLogo />
    </a>
  </div>
</footer>

<style>
  footer {
    display: flex;
    color: var(--fg);
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--component-1);
    margin-top: var(--base-4);
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: var(--max-width);
    width: 100%;
    padding: var(--base-4) var(--base-2);
  }

  a {
    color: var(--fg);
    transition: all 150ms;
    opacity: 0.7;
    text-decoration: none;
  }

  a:hover {
    opacity: 1;
  }

  .icon-link {
    display: block;
  }
</style>
