using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Identity.Web;

[AllowAnonymous]
public class AccountController : Controller
{
    [HttpGet]
    public IActionResult SignOut(string page)
    {
        return new SignOutResult(new[] { "oidc", "Cookies" });          
    }
}