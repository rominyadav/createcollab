## Role Assignment After Signup

### Workflow

1. User signs up
2. User is redirected to creator or brand dashboard according what they picked
3. The public metadata role is updated from the dashboard/onboarding page

```ts
const assignUserRole = async (role) => {
  const { user } = useUser();

  if (user) {
    await user.update({
      publicMetadata: {
        ...user.publicMetadata,
        role: role,
      },
    });
  }
};
```

4. After that, then maybe sync with convex
