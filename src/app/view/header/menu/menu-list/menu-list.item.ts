export class MenuListItem {
  public static readonly PROFILE   : MenuListItem = new MenuListItem('profile');
  public static readonly ABOUT     : MenuListItem = new MenuListItem('about');
  public static readonly PORTFOLIO : MenuListItem = new MenuListItem('portfolio');
  public static readonly BLOG      : MenuListItem = new MenuListItem('blog');
  public static readonly GITHUB    : MenuListItem = new MenuListItem('github');

  private readonly menuName : string;

  private constructor(menuName : string){
    this.menuName = menuName;
  }

  public static values() : Array<MenuListItem> {
    return [MenuListItem.PROFILE, MenuListItem.ABOUT, MenuListItem.PORTFOLIO, MenuListItem.BLOG, MenuListItem.GITHUB];
  }

  public toName() : string {
    return this.menuName;
  }
}
