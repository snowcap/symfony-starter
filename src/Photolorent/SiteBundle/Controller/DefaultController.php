<?php

namespace Photolorent\SiteBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;


class DefaultController extends Controller
{
    /**
     * @Route("/")
     * @Template()
     */
    public function indexAction()
    {
        $path = $this->get('kernel')->getRootDir() . '/../web/uploads/mariages/*';
        $finder = new Finder();

        $finder->in($path)->sortByName();
        $finder->files()->name('*.jpg');

        $files = array();
        /** @var $file SplFileInfo */
        foreach($finder as $file) {
            //$content = $file->getContents();

            $files[] = basename($file->getPath()) . '/' . $file->getFilename();
        }

        return array('files' => $files);
    }
}
