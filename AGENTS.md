<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep imported screens behind individual TanStack leaf routes to preserve the uploaded UI and browser navigation.
- Keep simulated irrigation sessions and records in the shared visit-only AppProvider; the prototype does not operate physical equipment.
- Bundle field imagery as a local src/assets import so it always loads in preview and published builds.
- Keep assessment documentation in docs, separate from operational UI.
- Keep dashboard field selection in AppProvider and render its selected field data in the existing status panel so selection visibly changes content without adding layouts.
