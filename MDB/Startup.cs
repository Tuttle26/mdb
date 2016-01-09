using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MDB.Startup))]
namespace MDB
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
