import Link from 'next/link';

import { SignUpMethodsContainer } from '@kit/auth/sign-up';
import { Button } from '@kit/ui/button';
import { Heading } from '@kit/ui/heading';
import { Trans } from '@kit/ui/trans';

import authConfig from '~/config/auth.config';
import pathsConfig from '~/config/paths.config';
import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
import { withI18n } from '~/lib/i18n/with-i18n';

export const generateMetadata = async () => {
  const i18n = await createI18nServerInstance();

  return {
    title: i18n.t('auth:signUp'),
  };
};

const paths = {
  callback: pathsConfig.auth.callback,
  appHome: pathsConfig.app.home,
};

function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">

        {/* Heading */}
        <div className="text-center">
          <Heading level={4} className="tracking-tight">
            <Trans i18nKey="auth:signUpHeading" />
          </Heading>

          <p className="mt-2 text-sm text-muted-foreground">
            Create an account to start publishing blogs
          </p>
        </div>

        {/* Makerkit Signup Logic */}
        <SignUpMethodsContainer
          providers={authConfig.providers}
          displayTermsCheckbox={authConfig.displayTermsCheckbox}
          paths={paths}
        />

        {/* Sign in link */}
        <div className="text-center">
          <Button asChild variant="link" size="sm">
            <Link href={pathsConfig.auth.signIn}>
              <Trans i18nKey="auth:alreadyHaveAnAccount" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}

export default withI18n(SignUpPage);





// import Link from 'next/link';

// import { SignUpMethodsContainer } from '@kit/auth/sign-up';
// import { Button } from '@kit/ui/button';
// import { Heading } from '@kit/ui/heading';
// import { Trans } from '@kit/ui/trans';

// import authConfig from '~/config/auth.config';
// import pathsConfig from '~/config/paths.config';
// import { createI18nServerInstance } from '~/lib/i18n/i18n.server';
// import { withI18n } from '~/lib/i18n/with-i18n';

// export const generateMetadata = async () => {
//   const i18n = await createI18nServerInstance();

//   return {
//     title: i18n.t('auth:signUp'),
//   };
// };

// const paths = {
//   callback: pathsConfig.auth.callback,
//   appHome: pathsConfig.app.home,
// };

// function SignUpPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-2xl bg-white rounded-xl border shadow-sm p-8">

//         {/* Title */}
//         <div className="text-center mb-6">
//           <Heading level={3} className="tracking-tight">
//             Create Account
//           </Heading>
//           <p className="text-sm text-muted-foreground mt-2">
//             Join ToddlersWorld and start shopping today
//           </p>
//         </div>

//         {/* Makerkit Signup Form */}
//         <SignUpMethodsContainer
//           providers={authConfig.providers}
//           displayTermsCheckbox={authConfig.displayTermsCheckbox}
//           paths={paths}
//         />

//         {/* Divider */}
//         <div className="my-6 border-t" />

//         {/* Footer */}
//         <p className="text-center text-sm text-muted-foreground">
//           Already have an account?{' '}
//           <Button asChild variant="link" className="px-1">
//             <Link href={pathsConfig.auth.signIn}>
//               Sign in
//             </Link>
//           </Button>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default withI18n(SignUpPage);
