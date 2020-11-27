using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Graph;
using Microsoft.Identity.Web;

[AllowAnonymous]
public class AccountController : Controller
{
    [HttpGet]
    public IActionResult SignOutSuccess() {
        return View();
    } 

    [HttpGet]
    public IActionResult SignOut(string page)
    {
       return SignOut(new AuthenticationProperties() { RedirectUri = "/Account/SignOutSuccess" });
    }
}